<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use Illuminate\Http\Request;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $studentData = Student::query();
        if ($request->has('name')) {
            $studentData->where(function ($query) use ($request) {
                $query->where('Firstname', 'like', '%' . $request->input('name') . '%')
                    ->orwhere('id', 'like', '%' . $request->input('name') . '%')
                    ->orWhere('Middlename', 'like', '%' . $request->input('name') . '%')
                    ->orWhere('Lastname', 'like', '%' . $request->input('name') . '%');
            });
        }

        $finalStudentData = $studentData->paginate(10);
        return Inertia('Student/Index', [

            'students' => StudentResource::collection($finalStudentData),
            'queryParams' => $request->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia('Student/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        //
        $validatedData = $request->validated();

        if ($validatedData) {
            $student = Student::create($validatedData);
            return redirect()->route('students.index')->with(['type' => 'success', 'message' => 'Student created successfully']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {

        return Inertia('Student/Edit', [
            'students' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $validatedData = $request->validated();
        if ($validatedData) {
            $student->update($validatedData);
            return redirect()->route('students.index')->with(['type' => 'success', 'message' => 'Student updated successfully']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {

        $student->delete();
        return redirect()->route('students.index')->with(['type' => 'success', 'message' => 'Student deleted successfully']);
    }
}
