<?php
namespace App\repositories;

use App\Models\Board;
use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

class BoardRepository implements  CrudInterface {

    public function getAll()
    {
       $boards = Board::withCount('tasks')->orderBy('id','desc')->get();
       return $boards;
    }

    public function findById($id)
    {
        $board = Board::with('tasks')->find($id);
        return $board;
    }

    public function create(Request $request)
    {
        $board = new Board();
        $board->name = $request->name;
        $board->description = $request->description;
        $board->user_id= $request->user_id;
        $board->user_name= $request->user_name;
        $board->save();
        return $board;

    }

    public function edit(Request $request, $id)
    {
        $board = $this->findById($id);
        $board->name = $request->name;
        $board->description = $request->description;
        $board->user_id = $request->user_id;
        $board->user_name= $request->user_name;
        $board->save();
        return $board;

    }

    public function delete($id)
    {
        $board = $this->findById($id);
        $board->tasks()->delete();
        $board->delete();
        return $board;
    }
}
