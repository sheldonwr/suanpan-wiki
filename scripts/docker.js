const exec = require('child_process').exec;

const suanpan = require('../package.json').suanpan;
const imageName = suanpan.image_name;
const imageRegistry = suanpan.image_registry;
const imageNamespace = suanpan.image_namespace;
const version = suanpan.version;

const tagVersions = [version, 'latest'];

const run = function (cmd) {
  return new Promise((resolve, reject) => {
    console.log(`run cmd: ${cmd}`);
    const p = exec(
      cmd,
      {
        encoding: 'utf8',
      },
      function (error, stdout, stderr) {
        if (error) {
          console.error('error: ' + error);
          reject(error);
        }
        if (stdout) console.log('cmd end: ' + stdout);
        if (stderr) console.log('cmd err: ' + stderr);
        resolve();
      }
    );
    p.stdout.on('data', (data) => {
      console.log(data);
    });
    // return out
  });
};

async function buildImage(imageName, tags, arch) {
  let tagParameter = '';
  for (const tag of tags) {
    console.log('build', `${imageName}:${tag} `);
    tagParameter += ` -t ${imageName}:${tag} `;
  }
  await run(
    `docker build --no-cache ${tagParameter} --build-arg ARCH=${arch}  -f docker/Dockerfile .`
  );
}

async function pushImage(imageName, tags) {
  for (const tag of tags) {
    await run(`docker push ${imageName}:${tag}`).catch((error) => {
      console.log(error);
    });
  }
}

const env = process.env;

async function main() {
  const arch = "amd64"
  await run('pwd');
  await buildImage(
    `${imageRegistry}/${imageNamespace}-${arch}/${imageName}`,
    tagVersions,
    arch
  );
  if (env.DONTPUSH) {
    console.log('skip push images');
  } else {
    await pushImage(
      `${imageRegistry}/${imageNamespace}-${arch}/${imageName}`,
      tagVersions
    );
  }
};

main().then(() => { console.log('built successfully.') });