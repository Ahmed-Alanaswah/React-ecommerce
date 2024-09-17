import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col key={idx} sx={3} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
          speed={2}
          width={180}
          height={209}
          viewBox="0 0 180 209"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="30" y="168" rx="4" ry="4" width="100" height="6" />
          <circle cx="81" cy="75" r="72" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderSkeletons}</Row>;
};

export default CategorySkeleton;
