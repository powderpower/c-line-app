import a from "jquery";
import { createTable, storeData, findState, fillHelper } from './components/utils';

a(function()
{
    var tableData, state, dump,
    app = a('#app'),
    main = a(document),
    body = a('body'),
    events = ['loading', 'create_table', 'remove_widget', 'no_data', 'update_table'],
    token = document.head.querySelector('meta[name="csrf-token"]').content;
    main.on(events[0]+' '+events[3],
        (b) =>
        {
            var statInfo = {[events[0]]:'Загрузка...', [events[3]]:'Нет данных'};
            app.html(statInfo[b.type])
        });
    main.on(events[1],
        () =>
        {
            var output = createTable(tableData);
            app.html(output.content);
            state = output.state,
            dump = output.dump;
        });
    main.on(events[4],
        function(e, data)
        {
            a.get('/', {action:'data'},
            function(b)
            {
                if(b.errinfo){main.trigger(events[3]); return false;}
                tableData = storeData(b);
                main.trigger(events[1]);
                (data)&&(a('.err-block').removeClass('hid'),
                a.each(data, function(b,c)
                {
                    Object.keys(c).forEach(d =>{a('tr#'+b).find('td#'+d).addClass('edited')});
                }));
            }, 'json');
        });
    main.trigger(events[0]);
    main.trigger(events[4]);
    body.on('mouseenter mouseleave click', 'th', function(b) {
        var c = a(this),
        d = c.attr('id'),
        e = a('.table').find('.'+d),
        f = 'hovered', g = c.css('width');
        if(d!='id'&&c.attr('active')!='true')
        {
            b.type == 'mouseenter'? e.addClass(f) : e.removeClass(f);
            if(b.type == 'click')
            {
                var h = ['hid','clickable'];
                main.trigger(events[2]);
                a('td.'+d).each(function(){var h = a(this); dump[h.parent().attr('id')].push({[h.attr('id')]:h.html()});});
                c.attr('style','width:'+g).attr('active','true');
                a('td.'+d).attr('style',"width:"+g).html("<input type='text' class='form-control' id="+d+" placeholder='...'>");
                a('.btn#'+d).removeClass(h[0]).addClass(h[1]);
                a('.save').removeClass(h[0]).addClass(h[1]);
            }
        }
    });
    main.on(events[2], function(){a('.widget').remove()});
    body.on('click', '.clickable', function()
    {
        var b = a(this),
        c = b.attr('id'),
        d = b.attr('opt'),
        e = ['hid', 'clickable'];
        if(d == 'cancel')
        {
            a('input#'+c).val('').trigger('input'); 
            a('td.'+c).each(function(e){var h = a(this); h.html(findState(dump, h.parent().attr('id'), h.attr('id')));});
            a('th#'+c).attr('active', 'false');
            b.addClass(e[0]).removeClass([1]);
            main.trigger(events[2]);
            !a('input').length&&a('.save').addClass(e[0]).removeClass(e[1]);
        }else if(d == 'save')
        {
            main.trigger(events[2]);
            main.trigger(events[0]);
            a.post('/', {'_token':token, 'data':JSON.stringify(state)},
            function(b)
                {
                    var errData;
                    !b.errinfo&&((Object.keys(b.err).length)&&(errData = b.err));
                    main.trigger(events[0]);
                    main.trigger(events[4], errData);
                },
            'json')
            .fail(function(b){alert('Что-то пошло не так...')});
        }
    });
    body.on('input click', 'input', function(b)
    {
        var c = a(this),
        d = c.parent().parent().attr('id'),
        e = c.attr('id'),
        f = c.val(),
        g = c.offset(),
        h = state[d],
        i = findState(dump, d, e),
        j = fillHelper(tableData.uniques, e, f), k,
        l = 'hid';
        h[e] = [f, i];
        if(b.type=='click')
        {
            a('.widget').remove();
            body.append("<div class='widget' id='"+e+"' opt="+d+" style='top:"+(g.top+44)+"px; left:"+g.left+"px; width:"+c.css('width')+"'></div>");
        }
        k = a('.widget');
        a('.widget_submit').remove();
        j.length ? (j.forEach( b => {k.append("<div class='widget_submit'>"+b+"</div>")}), k.removeClass(l)) : k.addClass(l);
    });
    body.on('click', '.widget_submit', function()
    {
        var b = a(this),
        c = b.parent(),
        d = c.attr('id'),
        e = c.attr('opt');
        a('tr#'+e).find('input#'+d).val(b.html());
        main.trigger(events[2]);
        a('input').trigger('input');
    });
});