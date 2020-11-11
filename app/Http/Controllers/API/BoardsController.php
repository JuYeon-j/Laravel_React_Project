<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\repositories\BoardRepository;
use Illuminate\Http\Request;

class BoardsController extends Controller
{
    public $boardRepository;

    public function __construct(BoardRepository $boardRepository){
        $this->boardRepository = $boardRepository;
    }

    // index() Get all Board List
    public function index(){
        $boards = $this->boardRepository->getAll();
        return response()->json([
            'success'=> true,
            'message'=> 'Project List',
            'data'=>$boards
        ]);
    }

    // show() Find Board by ID
    public function show($id){
        $board = $this->boardRepository->findById($id);

        if(is_null($board)){
            return response()->json([
                'success'=> false,
                'message'=> 'Project Details',
                'data'=>null
            ]);

        }
        return response()->json([
            'success'=> true,
            'message'=> 'Project Details',
            'data'=> $board
        ]);
    }

    // store() Create New Board
    public function store(Request $request){
        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'user_id'=>'required'
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

        $board = $this->boardRepository->create($request);
        return response()->json([
            'success'=> true,
            'message'=> 'Project Stored',
            'data'=>$board
        ]);
    }

    // update() Update board by ID
    public function update(Request $request, $id){

        $board = $this->boardRepository->findById($id);
        if(is_null($board)){
            return response()->json([
                'success'=> false,
                'message'=> 'Project Not found',
                'data'=> null,
            ]);
        }
        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'user_id'=>'required'
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

        $board = $this->boardRepository->edit($request, $id);
        return response()->json([
            'success'=> true,
            'message'=> 'Project Updated',
            'data'=>$board
        ]);
    }

    // destroy() Delete a Board
    public function destroy($id){

        $board = $this->boardRepository->findById($id);
        if(is_null($board)){
            return response()->json([
                'success'=> false,
                'message'=> 'Project Not found',
                'data'=> null,
            ]);
        }

        $board = $this->boardRepository->delete($id);
        return response()->json([
            'success'=> true,
            'message'=> 'Project Updated',
            'data'=>$board
        ]);
    }
}
