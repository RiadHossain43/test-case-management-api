/**
 * Every users given an access policy gets a read permission to the specified
 * workspace, the permissions more precisely means to manage administrative authorities
 * on the features where it's required. Permission checks will apply only in the access 
 * controlling places. Apis or actions that don't require any authoretive process are out 
 * of this scope and open to all users to consume.
 */
const permissions = {
  workspace: {
    canManageUsers: {
      type: Boolean,
      default: false,
    },
    canEditInformations: {
      type: Boolean,
      default: false,
    },
  },
  testCases: {
    canManageTestCases: {
      type: Boolean,
      default: false,
    },
    executions: {
      canManageRuns: {
        type: Boolean,
        default: false,
      },
      canExecuteRuns: {
        type: Boolean,
        default: false,
      },
    },
    collections: {
      canManageCollections: {
        type: Boolean,
        default: false,
      },
    },
  },
};
module.exports = { permissions };
