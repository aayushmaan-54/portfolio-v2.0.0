'use client';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { sendContactEmail } from '~/actions/send-contact-email.action';
import Icons from '~/common/icons/icons';
import { sendContactEmailActionProps } from '~/common/types/types';



function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="button-1 rounded-lg! w-full! flex items-center justify-center gap-3 py-3! font-semibold"
      disabled={pending}
      aria-busy={pending}
      aria-label="submit contact form"
    >
      <span>{pending ? 'Sending...' : 'Send Message'}</span>
      <Icons.Send className='size-5 mt-1' />
    </button>
  );
}




export default function ContactForm() {
  const initialState: sendContactEmailActionProps = {
    status: '',
    message: '',
  };
  const [state, formAction] = useActionState(sendContactEmail, initialState);


  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
      const form = document.getElementById('contact-form') as HTMLFormElement | null;
      if (form) {
        form.reset();
      }
    } else if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);


  return (
    <>
      <h1 className="text-accent-1/40 text-5xl font-black mb-7 mt-28">Get in touch: </h1>
      <div className="">
        <form
          id="contact-form"
          action={formAction}
          className='flex flex-col gap-4 max-w-2xl mx-auto'
        >
          <h1 className="text-3xl sm:text-5xl font-black mx-auto">Send me a Message!</h1>
          <input
            type="text"
            name="name"
            aria-label='name'
            required
            placeholder='John Doe'
            className='input'
          />

          <input
            type="email"
            name="email"
            aria-label='email'
            required
            placeholder='john.doe45@gmail.com'
            className='input'
          />

          <textarea
            name="message"
            aria-label='message'
            rows={4}
            required
            placeholder='Your message here...'
            className='input'
          />

          <SubmitButton />
        </form>
      </div>
    </>
  );
}
