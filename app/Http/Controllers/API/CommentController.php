<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\repositories\CommentRepository;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public $CommentRepository;

    public function __construct(CommentRepository $CommentRepository){
        $this->CommentRepository = $CommentRepository;
    }

    // index() Get all Comment List
    public function index(){
        $Comments = $this->CommentRepository->getAll();
        return response()->json([
            'success'=> true,
            'message'=> 'Comment List',
            'data'=>$Comments
        ]);
    }

    // show() Find Comment by ID
    public function show($id){
        $Comment = $this->CommentRepository->findById($id);

        if(is_null($Comment)){
            return response()->json([
                'success'=> false,
                'message'=> 'Comment Details',
                'data'=>null
            ]);

        }
        return response()->json([
            'success'=> true,
            'message'=> 'Comment Details',
            'data'=> $Comment
        ]);
    }

    // store() Create New Comment
    public function store(Request $request){
        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'comment'=>'required',
            'board_id'=>'required',
            'user_id'=>'required',
            'user_name'=>'required'
        ], [
                'comment.required'=>'Please give comment',

            ]
        );

        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=> $validator->getMessageBag()->first(),
                'errors'=> $validator->getMessageBag(),
            ]);
        }

        $Comment = $this->CommentRepository->create($request);
        return response()->json([
            'success'=> true,
            'message'=> 'Comment Stored',
            'data'=>$Comment
        ]);
    }

    // update() Update Comment by ID
    public function update(Request $request, $id){

        $Comment = $this->CommentRepository->findById($id);
        if(is_null($Comment)){
            return response()->json([
                'success'=> false,
                'message'=> 'Comment Not found',
                'data'=> null,
            ]);
        }
        $formData = $request->all();

        $validator = \Validator::make($formData,[
            'comment'=>'required',
            'board_id'=>'required',
            'user_id'=>'required',
            'user_name'=>'required'
        ], [
                'comment.required'=>'Please give comment',

            ]
        );

        if($validator->fails()){
            return response()->json([
                'success'=> false,
                'message'=> $validator->getMessageBag()->first(),
                'errors'=> $validator->getMessageBag(),
            ]);
        }

        $Comment = $this->CommentRepository->edit($request, $id);
        return response()->json([
            'success'=> true,
            'message'=> 'Comment Updated',
            'data'=>$Comment
        ]);
    }

    // destroy() Delete a Comment
    public function destroy($id){

        $Comment = $this->CommentRepository->findById($id);
        if(is_null($Comment)){
            return response()->json([
                'success'=> false,
                'message'=> 'Comment Not found',
                'data'=> null,
            ]);
        }

        $Comment = $this->CommentRepository->delete($id);
        return response()->json([
            'success'=> true,
            'message'=> 'Comment Updated',
            'data'=>$Comment
        ]);
    }
}
