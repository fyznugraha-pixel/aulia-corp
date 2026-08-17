'use server';

import { prisma } from '@/lib/db';
import { loginSchema } from '@/lib/validations';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return { error: 'Invalid input data' };
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: result.data.email },
  });

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const passwordMatch = await bcrypt.compare(result.data.password, user.passwordHash);

  if (!passwordMatch) {
    return { error: 'Invalid email or password' };
  }

  const token = await signToken({ id: user.id, email: user.email });

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'admin_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  redirect('/admin');
}
