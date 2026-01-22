import React from 'react';

import { Role } from 'src/types/authContextTypes/userRole';

import {
  UpdateProfessionalProfileFormShape,
  UpdateRecruiterProfileFormShape,
} from 'src/types/FormProps';

import { UserTypes } from 'src/types/authContextTypes/authContextTypes';
import EditProfileProfessionalForm from './EditProfileProfessionalForm';
import EditProfileRecruiterForm from './EditProfileRecruiterForm';

const EditProfileForm = ({
  user,
  loading,
  handleSubmit,
}: {
  user: UserTypes;
  loading: boolean;
  handleSubmit: (
    values:
      | UpdateRecruiterProfileFormShape
      | UpdateProfessionalProfileFormShape,
  ) => Promise<void>;
}) => {
  if (!user) {
    return <></>;
  }
  switch (user.role) {
    case Role.PROFESSIONAL:
      return (
        <EditProfileProfessionalForm
          {...{ user, handleSubmit, loading }}
        ></EditProfileProfessionalForm>
      );
    case Role.RECRUITER:
      return (
        <EditProfileRecruiterForm
          {...{ user, handleSubmit, loading }}
        ></EditProfileRecruiterForm>
      );
  }
};

export default EditProfileForm;
