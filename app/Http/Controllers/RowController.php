<?php

namespace App\Http\Controllers;

use App\Models\Row;
use Illuminate\Http\Request;

class RowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Row::select('id','name')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required'
         ]);
         
         Row::create($request->post());
 
         return response()->json([
             'message'=>'Class added successfully'
         ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Row $row)
    {
        return response()->json([
            'row'=>$row
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Row $row)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Row $row)
    {
        $request->validate([
            'name'=>'required'
         ]);

         $row->fill($request->post())->update();
         $row->save();

         return response()->json([
            'message'=>'Class updated successfully'
         ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Row $row)
    {
        $row->delete();
    }
}