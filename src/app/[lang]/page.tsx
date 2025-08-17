import Home from "../../pages/Home";


export default  async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    name?: string;
    details?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  
  return <Home searchParams={searchParams} />
}