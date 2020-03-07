// import { createResource, createCache } from "simple-cache-provider";
import api from "../utils/api";

// export const cache = createCache();

const getRepositories = query =>
  getResource(query.toLowerCase(), () => {
    return new Promise(resolve => {
      api
        .get("/search/repositories", {
          params: {
            q: query
          }
        })
        .then(response => {
          resolve(response.data.items);
        });
    });
  });

const getComments = repo =>
  getResource(`repo-${repo.id}`, () => {
    const { name, owner } = repo;
    return new Promise(resolve => {
      setTimeout(() => {
        api.get(`/repos/${owner.login}/${name}/comments`).then(response => {
          const { data } = response;
          const comments = data.sort((curr, prev) => prev.id - curr.id);
          resolve(comments.slice(0, 5));
        });
      }, 2000);
    });
  });

const getUser = userName =>
  createResource(`user-${userName.toLowerCase()}`, () => {
    return new Promise((resolve, reject) => {
      Promise.all([
        api.get(`/users/${userName}`),
        api.get(`/users/${userName}/repos?per_page=10&sort=pushed`)
      ]).then(values => {
        const [userValues, reposValues] = values;
        resolve({
          ...userValues.data,
          repos: reposValues.data
        });
      });
    });
  });

const getImage = path =>
  getResource(`image-${path}`, () => {
    return new Promise(
      resolve => {
        const img = new Image();
        img.onload = () => resolve(path);
        img.src = path;
      });
  });

const localCache = {};

function getResource(key, asyncFn) {
  let resource = localCache[key];
  if (!resource) {
    resource = createResource(asyncFn);
    localCache[key] = resource;
  }
  return resource;
}

function createResource(asyncFn) {
  let status = "pending";
  let result;
  let promise = asyncFn().then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") throw promise;
      if (status === "error") throw result;
      if (status === "success") return result;
      throw new Error("This should be impossible");
    }
  };
}


export default {
  getRepositories,
  getComments,
  getUser,
  getImage,
};
