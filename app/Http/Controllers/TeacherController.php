<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teacherNumbers = DB::table('teachers')->count('id');
        $teachers = Teacher::select('id','name','birthday','address')->get();
       return response()->json([
        'teachers'=>$teachers,
        'teachersNumbers' => $teacherNumbers
       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'birthday' => 'required',
            'address' => 'required'
        ]);
        Teacher::create($request->post());
        return response() -> json([
            'message'=>'Teacher added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        
        return response()->json([
            'teacher' =>$teacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            'name'=>'required',
            'birthday' => 'required',
            'address' =>'required'
        ]);
        $teacher->fill($request->post()) ->update();
        $teacher->save();
        return response()->json([
            'message' => 'Teacher info updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
    }
}