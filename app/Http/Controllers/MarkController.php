<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $marks = DB::table('marks')
        ->join('students', 'marks.student_id', '=', 'students.id')
        ->join('subjects','marks.subject_id','=','subjects.id')
        ->select('marks.*', 'students.name as student','subjects.name as subject')
        ->get();
        return response()->json([
            'marks'=>$marks
        ]);
        /* Mark::select('id','student_id','subject_id','mark','student','subject')->get(); */
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id'=>'required',
            'subject_id'=>'required',
            'mark' =>'required|numeric|digits_between:1,100',
         ]);
         
         Mark::create($request->post());
 
         return response()->json([
             'message'=>'Mark added successfully'
         ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mark $mark)
    {
        return response()->json([
            'mark'=>$mark
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mark $mark)
    {
        $request->validate([
            'student_id'=>'required',
            'subject_id'=>'required',
            'mark' =>'required|numeric|digits_between:1,100',
         ]);

         $mark->fill($request->post())->update();
         $mark->save();

         return response()->json([
            'message'=>'mark updated successfully'
         ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mark $mark)
    {
        $mark->delete();
    }
}