<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\repositories\TaskRepository;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public $TaskRepository;

    public function __construct(TaskRepository $TaskRepository){
        $this->TaskRepository = $TaskRepository;
    }

    // index() Get all Task List
    public function index(){
        $Tasks = $this->TaskRepository->getAll();
        return response()->json([
            'success'=> true,
            'message'=> 'Task List',
            'data'=>$Tasks
        ]);
    }

    // show() Find Task by ID
    public function show($id){
        $Task = $this->TaskRepository->findById($id);

        if(is_null($Task)){
            return response()->json([
                'success'=> false,
                'message'=> 'Task Details',
                'data'=>null
            ]);

        }
        return response()->json([
            'success'=> true,
            'message'=> 'Task Details',
            'data'=> $Task
        ]);
    }

    // store() Create New Task
    public function store(Request $request){
        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'board_id'=>'required'
        ], [
                'name.required'=>'Please give project name',
                'description.required'=>'Please give project description',
            ]
        );

        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=> $validator->getMessageBag()->first(),
                'errors'=> $validator->getMessageBag(),
            ]);
        }

        $Task = $this->TaskRepository->create($request);
        return response()->json([
            'success'=> true,
            'message'=> 'Task Stored',
            'data'=>$Task
        ]);
    }

    // update() Update Task by ID
    public function update(Request $request, $id){

        $Task = $this->TaskRepository->findById($id);
        if(is_null($Task)){
            return response()->json([
                'success'=> false,
                'message'=> 'Task Not found',
                'data'=> null,
            ]);
        }
        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'board_id'=>'required'
        ], [
                'name.required'=>'Please give task name',
                'description.required'=>'Please give task description',
            ]
        );

        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=> $validator->getMessageBag()->first(),
                'errors'=> $validator->getMessageBag(),
            ]);
        }

        $Task = $this->TaskRepository->edit($request, $id);
        return response()->json([
            'success'=> true,
            'message'=> 'Task Updated',
            'data'=>$Task
        ]);
    }

    // destroy() Delete a Task
    public function destroy($id){

        $Task = $this->TaskRepository->findById($id);
        if(is_null($Task)){
            return response()->json([
                'success'=> false,
                'message'=> 'Task Not found',
                'data'=> null,
            ]);
        }

        $Task = $this->TaskRepository->delete($id);
        return response()->json([
            'success'=> true,
            'message'=> 'Task Updated',
            'data'=>$Task
        ]);
    }
}
