import { GetServerSideProps } from 'next';
import React from 'react';
import PageProvider from '../src/components/PageProvider/PageProvider';
import { PageProps } from '../src/types/types';

export default function index({ characterId, currentPage }: PageProps) {
  return <PageProvider characterId={characterId} currentPage={currentPage} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const id = params?.id || null;
  const page = params?.page || null;

  return {
    props: {
      characterId: id,
      currentPage: page,
    },
  };
};
