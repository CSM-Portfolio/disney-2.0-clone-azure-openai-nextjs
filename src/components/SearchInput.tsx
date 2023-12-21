"use client";

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object( {
    input: z.string().min( 2, {
        message: "Enter at least 2 characters to search.",
    } ).max( 50 ),
} );

const SearchInput = () =>
{
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            input: "",
        },
    } );

    // 2. Define a submit handler.
    function onSubmit ( values: z.infer<typeof formSchema> )
    {
        router.push( `/search/${ values.input }` );
    }



    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8">
                <FormField
                    control={ form.control }
                    name="input"
                    render={ ( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Search..." { ...field } />
                            </FormControl>
                            {/* <FormMessage /> */}
                        </FormItem>
                    ) }
                />
            </form>
        </Form>
    )
}

export default SearchInput