<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Row;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = DB::table('students')
        ->join('rows', 'students.class_id', '=', 'rows.id')
        ->select('students.*', 'rows.name as className')
        ->get();
        
        $classes = Row::select('name')->get();
        $studentsNumbers = DB::table('students')->count('id');
        return response()->json([
           'students'=>$students,
           'studentsNumbers'=>$studentsNumbers,
           'classes' =>$classes
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
            'address' => 'required',
            'image' => 'required|image',
            'class_id' => 'required'
        ]);
        $path = $request->file('image')->store('students','public');
        
        Student::create($request->post()+['image' =>$path]);
        return response()->json([
            'message'=>'item added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return response()->json([
            'student'=>$student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $request->validate([
        'name' => 'required',
        'birthday' => 'required',
        'address' => 'required',
        'image' => 'image',
        'class_id' => 'required'
        ]);

        $student ->fill($request->post())->update();
        if ($request->hasFile('image')) {
            if ($student->image) {
                $exist =  Storage::disk('public')->exists("{$student->image}");
                if ($exist) {
                    Storage::disk('public')->delete("{$student->image}");
                }
            }
            $path = $request->file('image')->store('students','public');
            $student->image = $path;
            $student->save();
            return response()->json([
                'message'=>'item updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
    $status = $student->delete();
    if($status) {
            $exist =  Storage::disk('public')->exists("{$student->image}");
            if ($exist) {
                Storage::disk('public')->delete("{$student->image}");
            }    
    }
}
}