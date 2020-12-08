<?php
namespace App\repositories;

use App\Models\Comment;
use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

class CommentRepository implements CrudInterface {

    public function getAll()
    {
       $comments = Comment::orderBy('id','desc')->get();
       return $comments;
    }

    public function findById($id)
    {
        $comment = Comment::with('board')->find($id);
        return $comment;
    }

    public function create(Request $request)
    {
        $comment = new Comment();
        $comment->comment = $request->comment;
        $comment->board_id= $request->board_id;
        $comment->status = 0;
        $comment->user_id=$request->user_id;
        $comment->user_name=$request->user_name;
        $comment->save();
        return $comment;

    }

    public function edit(Request $request, $id)
    {
        $comment = $this->findById($id);
        $comment->comment = $request->comment;
        $comment->board_id = $request->board_id;
        $comment->user_id=$request->user_id;
        $comment->user_name=$request->user_name;
        $comment->save();
        return $comment;

    }

    public function delete($id)
    {
        $comment = $this->findById($id);
        $comment->delete();
        return $comment;
    }
}
