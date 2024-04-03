const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties({ showFeatured = false } = {}) {
  if (!apiDomain) {
    return [];
  }
  try {
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function fetchPropertyById(id) {
  if (!apiDomain) {
    return [];
  }
  try {
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchPropertyById };
