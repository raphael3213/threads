"use client";
import React from "react";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/thread";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

type CommentProps = {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
};

function Comment({ threadId, currentUserImg, currentUserId }: CommentProps) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
      accountId: currentUserId,
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Phot"
                  height={48}
                  width={48}
                  priority
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="text-light-1 outline-none no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
