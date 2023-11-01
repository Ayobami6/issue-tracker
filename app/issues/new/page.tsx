'use client'
import { TextField, TextArea, Button } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>();

    const handleCreateIssue = async (data: IssueForm) => {
        const dataRes = await axios.post('/api/issues', data)
        console.log(dataRes)
        router.push('/issues')
    }

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data) => handleCreateIssue(data))}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')}>

                </TextField.Input>
            </TextField.Root>
            <Controller name='description' control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field} />} />

            <Button>Submit</Button>
        </form>
    )
}

export default NewIssuePage