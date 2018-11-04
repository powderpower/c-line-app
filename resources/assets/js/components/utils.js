function storeData(input)
{
    var tableData = {content:{}, name:[['id', '#']], uniques:{}}
    Object.keys(input.data).forEach(b =>
    {
        var item = [];
        Object.keys(input.data[b]).forEach( c =>
            {
                (c!='created_at'&&c!='updated_at')&&(item.push(input.data[b][c]));
            });
        tableData.content[input.data[b].id] = item;
    });

    Object.keys(input.columns).forEach( b => 
        {
            tableData.uniques[b] = [];
            tableData.name.push([b, input.columns[b][1]]);
        });
    
    Object.keys(input.unique).forEach( b =>
        {
            Object.keys(input.unique[b]).forEach( c =>
                {
                    Object.keys(input.unique[b][c]).forEach( d =>
                        {
                            (d!='id'&&d!='created_at'&&d!='updated_at')&&(tableData.uniques[d].push(input.unique[b][c][d]));
                        });
                });
        });
    
    return tableData;
}

function createTable(data)
{
    var inner = {head:"", body:"", buttons:""},
    state = {},
    dump = {},
    content;
    data.name.forEach( b =>
        {
            inner.head += "<th scope='col' id='"+b[0]+"' class='hov "+b[0]+"'>"+b[1]+"</th>";
            b[0]!='id'&&(inner.buttons += "<td><button type='button' id='"+b[0]+"' opt='cancel' class='btn btn-danger hid'>Отменить</button></td>");
        });
    
    Object.keys(data.content).forEach( b =>
        {
            var trInner = "";
            data.content[b].forEach((c,d) =>
            {
                trInner += "<td id="+data.name[d][0]+" class='hov "+data.name[d][0]+"'>"+c+"</td>";
            });
            inner.body += "<tr id="+b+">"+trInner+"</tr>";
            state[b] = {};
            dump[b] = [];
        });
    
    content = "<table class='table'><thead><tr>"+inner.head+"</tr><thead><tbody>"+inner.body+"<tr><td></td>"+inner.buttons+"</tr></tbody></table>"+
        "<button type='button' opt='save' class='btn btn-primary hid clickable save'>Cохранить данные</button><div class='inline edited ml err-block hid'>"+
        "*Данные которые вы пытались изменить, измененные другим пользователем, в течении вашей сесси</div>";
    return {state:state, dump:dump, content:content};
}

function findState(b, c, d)
{
    var e;
    b[c].forEach(f => {f[d]!==undefined&&(e = f[d])});
    return e;
}

function fillHelper(b, c, d)
{
    var e = new RegExp(d),
    f = [];
    b[c].forEach(function(g){var h = g.toString().match(e); h&&(f.push(h.input))});
    return f;
}

module.exports = {createTable, storeData, findState, fillHelper};