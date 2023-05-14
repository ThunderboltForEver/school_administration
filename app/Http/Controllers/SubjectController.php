<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjectsNumbers = DB::table('subjects')->count('id');
        $subjects= DB::table('subjects')
        ->join('teachers','subjects.teacher_id','=','teachers.id')
        ->select('subjects.*','teachers.name as teacher')
        ->get();

        return response()->json([
           'subjects'=>$subjects,
           'subjectsNumbers' =>$subjectsNumbers
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'teacher_id'=>'required'
        ]);
        Subject::create($request->post());

        return response()->json([
        'message'=>'Subject Added Sucessfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        return response()->json([
            'subject'=>$subject
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name'=> 'required',
            'teacher_id'=>'required' 
        ]);
        $subject->fill($request->post())->update();
        $subject->save();
        
        return response()->json([
            'message'=>'subject updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();
    }
}