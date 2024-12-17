import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router, usePage, useForm } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import TextInput from "@/Components/TextInput";


export default function Index({ auth, students, queryParams = null }) {

    const createStudents = (e) => {
        e.preventDefault();

        router.get(route('students.create'));
    }


    const deleteStudent = (student) => {
        if (!window.confirm('Are you sure you want to delete this subject?')) {
            return;
        }

        router.delete(route('students.destroy', { student: student.id }));
    }


    const { flash } = usePage().props;
    const [flashMessage, setFlashMessage] = useState('');
    const [flashMessageType, setFlashMessageType] = useState('success');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (flash.message) {
            setFlashMessage(flash.message || '');
            setFlashMessageType(flash.type || 'success');
            // Disable the button if there's an error
            setIsDisabled(flash.type === 'error');
        } else {
            // Enable the button if there's no flash message
            setIsDisabled(false);
        }
    }, [flash.message, flash.type]);
    queryParams = queryParams || {};


    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('students.index'), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChange(name, e.target.value);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students
                </h2>
            }
        >
            <Head title="Students" />

            {flashMessage && (
                <FlashMessage
                    message={flashMessage}
                    type={flashMessageType}
                    onClose={() => setFlashMessage('')}
                />
            )}

            <div className="py-12">

                {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">

                    <div className="overflow-x-auto mt-5">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <button onClick={createStudents} className="btn btn-primary mt-8">Create New Students</button>
                                </tr>
                                <tr className="text-nowrap">
                                    <th colSpan="5">
                                        <TextInput className="w-full" placeholder="Enter Student ID or Name ..." defaultValue={queryParams.name} onBlur={e => searchFieldChange('name', e.target.value)}
                                            onKeyPress={e => onKeyPress('name', e)} />
                                    </th>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Birthday</th>
                                    <th>Created on </th>
                                    <th>Updated on</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {students.data.map((student) => (
                                <tr key={student.id} className="hover">
                                    <td>{student.id}</td>
                                    <td>{student.first_name}</td>
                                    <td>{student.last_name}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.created_at}</td>
                                    <td>{student.updated_at}</td>
                                    <td>
                                        <button
                                            className="block w-full text-blue-600 dark:text-blue-500 p-2 hover:bg-gray-100 transition-all"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(route('students.edit', { student: student.id }));
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="block w-full text-red-600 dark:text-red-500 p-2 hover:bg-gray-100 transition-all"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteStudent(student);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}