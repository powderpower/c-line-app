<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\DynamicModel;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Carbon\Carbon;

class RouteController extends Controller
{
    private $tableName;
    private $content;
    
    private function setData()
    {
        $this->content = json_decode(Storage::get('data.json'));
        return $this->tableName = $this->content->table_name;
    }
    
    private function storeData($action, $content)
    {
        $table = new DynamicModel;
        $this->setData();
        $tableName = $this->tableName;
        $table->setTable($tableName);        
        switch($action):
            case 'get_data':
                $tableData = $table->get();
                if(!count($tableData)):
                    $response = ["stat"=>"err", "errinfo"=>"no_data"];
                else:
                    foreach(Schema::getColumnListing($tableName) as $id):
                        $unique[] = $table->distinct()->select($id)->get();
                    endforeach;
                    $response = ["stat"=>"done", "data"=>$tableData, "columns"=>$content, "unique"=>$unique];
                endif;
                break;
            case 'insert_data':
                $table->insert($content);
                $response = true;
                break;
            case 'update_data':
                $errData = [];
                foreach($content[1] as $id=>$key):
                    $rowData = $table->whereId($id)->first();
                    foreach($key as $val):
                        if($rowData[key($val)]!=$val[key($val)]):
                            $errData[$id][key($val)] = $val[key($val)];
                        endif;
                    endforeach;
                endforeach;
                foreach($content[0] as $id=>$key):
                    foreach($key as $val):
                        foreach($val as $idVal=>$idKey):
                            if(isset($errData[$id][$idVal])): unset($val[$idVal]); endif;
                        endforeach;
                        $table->whereId($id)->update($val);
                    endforeach;
                endforeach;
                $response = ['stat'=>"done", "err"=>$errData];
                break;
        endswitch;
        return $response;
    }
    
    public function index(Request $request)
    {
        $this->setData();
        $tableName = $this->tableName;
        $content = $this->content;
        $dataTypes = $content->data_types;
        if(!Schema::hasTable($tableName)):
            Schema::create($tableName,
                function(Blueprint $table) use ($content, $dataTypes){
                    $table->increments('id');
                    foreach($dataTypes as $id=>$key):
                        switch ($key[0]):
                            case 'string':
                                $table->string($id)->nullable();
                                break;
                            case 'integer':
                                $table->integer($id)->nullable();
                                break;
                            case 'float':
                                $table->float($id)->nullable();
                                break;
                            case 'text':
                                $table->text($id)->nullable();
                                break;
                            break;
                        endswitch;
                    endforeach;
                    $table->timestamps();
                });
            $keys = [];
            $collection = [];            
            foreach($dataTypes as $id=>$key): $keys[] = $id; endforeach;
            if(isset($content->default_data)):
                $insert = true;
                foreach($content->default_data as $id=>$key):
                    $item = [];
                    for($i=0; $i<=count($key)-1; $i++): $item[$keys[$i]] = $key[$i]; endfor;
                    foreach(["created_at","updated_at"] as $id): $item[$id] = Carbon::now()->toDateTimeString(); endforeach;
                    $collection[] = $item;
                endforeach;
            endif;
        endif;
        isset($insert)&&$this->storeData('insert_data', $collection);
        switch($request->action):
            case 'data':
                return response()->json($this->storeData('get_data', $dataTypes));
            default:
                return view('main');
        endswitch;
    }

    public function edit(Request $request)
    {
        $data = json_decode($request->data);
        $updateData = [];
        $oldData = [];
        $response = ["stat"=>"err", "errinfo"=>"nothing_to_update"];
        foreach($data as $id=>$key):
            $isValue = false;
            $updateItem = [];
            $oldItem = [];
            foreach(get_object_vars($key) as $val=>$data):
                if(!empty($data[0])):
                    (!$isValue)&&($isValue = true);
                    $updateItem[] = [$val=>$data[0]];
                    $oldItem[] = [$val=>$data[1]];
                endif;
            endforeach;
            if($isValue):
                $updateData[$id] = $updateItem;
                $oldData[$id] = $oldItem;
            endif;
        endforeach;
        $this->setData();
        (count($updateData))&&($response = $this->storeData('update_data', [$updateData, $oldData]));
        return response()->json($response);
    }
}