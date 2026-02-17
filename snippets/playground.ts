// @ts-nocheck i know
import { b as a, c, a, _ } from 'xxx'
import type { b, c, a, _ } from 'xxx'
import XXX from 'xxx'
import xxx
from 'xxx'

// import syntax
import type x from 'x'

/// tofun
const fn = async (user: string) => {
  await fetch(`https://api.example.com/${user}`)
}

/// tofun
const fn = (user: string) => {
  fetch(`https://api.example.com/${user}`)
}

/// toarrow
function fetchUser(user: string) {
  fetch(`https://api.example.com/${user}`).then(({data}) => {return data})
}

/// toarrow
async function fetchUser(user: string) {
  const {data} = await fetch(`https://api.example.com/${user}`)
  return data
}

/* named import */
import A, { b, a, _c, _a } from 'xxx'
