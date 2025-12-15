interface props {
  title: string;
  label1?: string;
  label2?: string;
  value1?: number;
  value2?: number;
}

export default function StatCard({
  title,
  label1,
  label2,
  value1,
  value2,
}: props) {
  return (
    <>
      <div
        className="card shadow-sm border-0 rounded-4 p-3"
        style={{
          width: "15rem",
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
        }}
      >
        <div className="card-body p-0">
          <h6 className="text-uppercase fw-semibold text-secondary mb-2">
            {title}
          </h6>

          <div className="mb-2">
            <span className="text-danger fs-5 fw-bold ms-4">{value1} </span>
            <span className="text-secondary"> {label1}</span>
          </div>

          {label2 && (
            <div>
              <span className="text-danger fs-5 fw-bold ms-4">{value2} </span>
              <span className="text-secondary"> {label2} </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
