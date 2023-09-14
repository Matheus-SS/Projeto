export async function sleep(ms = 50) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('ok');
    }, ms);
  });
}
