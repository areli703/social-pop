import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import BaseIcon from '../components/BaseIcon';
import { mdiInformation } from '@mdi/js';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import FormCheckRadio from '../components/FormCheckRadio';
import BaseDivider from '../components/BaseDivider';
import BaseButtons from '../components/BaseButtons';
import { useRouter } from 'next/router';
import { getPageTitle } from '../config';
import { findMe, loginUser, resetAction } from '../stores/authSlice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getPexelsImage, getPexelsVideo } from '../helpers/pexels';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = (type, msg) => toast(msg, { type });
  const [illustrationImage, setIllustrationImage] = useState({});
  const [illustrationVideo, setIllustrationVideo] = useState({});
  const [contentType, setContentType] = useState('image');
  const [contentPosition, setContentPosition] = useState('left');

  const { currentUser, isFetching, errorMessage, token, notify: notifyState } = useAppSelector(state => state.auth);
  const [initialValues, setInitialValues] = useState({
    email: 'super_admin@flatlogic.com',
    password: 'password',
    remember: true,
  });

  useEffect(() => {
    async function fetchData() {
      const image = await getPexelsImage();
      const video = await getPexelsVideo();
      setIllustrationImage(image);
      setIllustrationVideo(video);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(findMe());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      router.push('/dashboard');
    }
  }, [currentUser?.id, router]);

  useEffect(() => {
    if (errorMessage) {
      notify('error', errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (notifyState?.showNotification) {
      notify('success', notifyState?.textNotification);
      dispatch(resetAction());
    }
  }, [notifyState?.showNotification]);

  const handleSubmit = async (values) => {
    const { remember, ...rest } = values;
    await dispatch(loginUser(rest));
  };

  const setLogin = (target) => {
    const email = target?.innerText;
    setInitialValues((prev) => ({ ...prev, email, password: 'password' }));
  };

  const imageBlock = (image) => (
    <div
      className='hidden md:flex flex-col justify-end relative w-1/3'
      style={{
        backgroundImage: `url(${image?.src?.original || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='bg-gradient-to-t from-gray-800 via-transparent to-transparent p-4'>
        <a className='text-xs text-white' href={image.photographer_url} target='_blank' rel='noreferrer'>
          Photo by {image.photographer} on Pexels
        </a>
      </div>
    </div>
  );

  const videoBlock = (video) => (
    video?.video_files?.length > 0 && (
      <div className='hidden md:flex flex-col justify-end relative w-1/3'>
        <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
          <source src={video.video_files[0]?.link} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className='bg-gradient-to-t from-gray-800 via-transparent to-transparent p-4 z-10'>
          <a className='text-xs text-white' href={video.user.url} target='_blank' rel='noreferrer'>
            Video by {video.user.name} on Pexels
          </a>
        </div>
      </div>
    )
  );

  return (
    <div style={contentPosition === 'background' ? { backgroundImage: `url(${illustrationImage?.src?.original || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg='violet'>
        <div className={`flex ${contentPosition === 'right' ? 'flex-row-reverse' : 'flex-row'} min-h-screen`}>
          {contentType === 'image' && contentPosition !== 'background' ? imageBlock(illustrationImage) : null}
          {contentType === 'video' && contentPosition !== 'background' ? videoBlock(illustrationVideo) : null}
          <div className='flex items-center justify-center flex-col space-y-4 w-full lg:w-2/3'>
            <CardBox className='w-full md:w-3/5 lg:w-2/3'>
              <h2 className='text-4xl font-semibold my-4'>Social Pop</h2>
              <div className='flex justify-between'>
                <div>
                  <p className='mb-2'>
                    Use <code className='cursor-pointer text-blue-500' onClick={(e) => setLogin(e.target)}>super_admin@flatlogic.com</code> to login as Super Admin
                  </p>
                  <p className='mb-2'>
                    Use <code className='cursor-pointer text-blue-500' onClick={(e) => setLogin(e.target)}>admin@flatlogic.com</code> to login as Admin
                  </p>
                  <p>
                    Use <code className='cursor-pointer text-blue-500' onClick={(e) => setLogin(e.target)}>client@hello.com</code> to login as User
                  </p>
                </div>
                <BaseIcon className='text-blue-500' w='w-16' h='h-16' size={48} path={mdiInformation} />
              </div>
            </CardBox>

            <CardBox className='w-full md:w-3/5 lg:w-2/3'>
              <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
                <Form>
                  <FormField label='Login' help='Please enter your login'>
                    <Field name='email' type='email' className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600' />
                  </FormField>
                  <FormField label='Password' help='Please enter your password'>
                    <Field name='password' type='password' className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600' />
                  </FormField>
                  <div className='flex justify-between items-center'>
                    <FormCheckRadio type='checkbox' label='Remember'>
                      <Field type='checkbox' name='remember' />
                    </FormCheckRadio>
                    <Link href='/forgot' className='text-blue-600'>Forgot password?</Link>
                  </div>
                  <BaseDivider />
                  <BaseButtons>
                    <BaseButton type='submit' label={isFetching ? 'Loading...' : 'Login'} color='info' disabled={isFetching} className='w-full' />
                  </BaseButtons>
                  <p className='text-center text-gray-600 mt-4'>
                    Don’t have an account yet? <Link href='/register' className='text-blue-600'>New Account</Link>
                  </p>
                </Form>
              </Formik>
            </CardBox>
          </div>
        </div>
      </SectionFullScreen>
      <ToastContainer />
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
