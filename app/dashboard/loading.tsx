// app/dashboard/loading.tsx

export default function Loading() {
  return (
    <div className="w-full h-screen bg-sacco-bg flex items-center justify-center">
      <div className="space-y-4 w-75">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-5/6"></div>
      </div>
    </div>
  );
}