function LoadingSkeleton() {
  return (
    <div className="skeleton-grid">
      {[1,2,3,4,5,6].map(n => (
        <div key={n} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      ))}
    </div>
  )
}
export default LoadingSkeleton