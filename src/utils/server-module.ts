// Import this first in any module that must never reach the client bundle (it
// reads the seed directly). If one slips into a client import graph, the
// browser fails loudly here instead of quietly shipping the data in the JS.
if (typeof window !== "undefined") {
  throw new Error("Cannot import a server module from the client");
}
