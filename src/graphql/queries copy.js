import { gql } from "@apollo/client";

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }
`;

const companyQuery = gql`
  query companies($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

const jobQuery = gql`
  query jobQuery($id: ID!) {
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }
`;
const jobsQuery = gql`
  query JobsQuery {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

async function createJob(input) {
  const { data } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return data.job;
}

async function loadCompany(id) {
  const { data } = await client.query({
    query: companyQuery,
    variables: { id },
  });
  return data.company;
}

async function loadJob(id) {
  const { data } = await client.query({
    query: jobQuery,
    variables: { id },
  });
  return data.job;
}

async function loadJobs() {
  const { data } = await client.query({
    query: jobsQuery,
    fetchPolicy: "no-cache",
  });
  return data.jobs;
}

export { createJob, loadCompany, loadJob, loadJobs };
