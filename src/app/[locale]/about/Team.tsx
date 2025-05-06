import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useState, useEffect, useRef } from "react";
import TeamCard from "./TeamCard";

export default function Team({ title }: { title: string }) {
  const teamMembers = [
    {
      id: 1,
      name: "Sophie Martin",
      image:
        "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team1.png",
    },
    {
      id: 2,
      name: "Jean Dupont",
      image:
        "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team2.png",
    },
    {
      id: 3,
      name: "Marie Laurent",
      image:
        "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team3.png",
    },
    {
      id: 4,
      name: "Pierre Dubois",
      image:
        "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team4.png",
    },
    {
      id: 5,
      name: "Camille Leroy",
      image:
        "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team5.png",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Adjust cards per page based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(teamMembers.length / cardsPerPage);

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / teamMembers.length;
      carouselRef.current.scrollTo({
        left: cardWidth * pageIndex * cardsPerPage,
        behavior: "smooth",
      });
    }
  };

  // Mouse wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (carouselRef.current) {
      e.preventDefault();
      carouselRef.current.scrollLeft += e.deltaY;
      updateCurrentPageFromScroll();
    }
  };

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      isDragging.current = true;
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    updateCurrentPageFromScroll();
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    updateCurrentPageFromScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // scroll-fast
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (carouselRef.current) {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    updateCurrentPageFromScroll();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Update current page based on scroll position
  const updateCurrentPageFromScroll = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / teamMembers.length;
      const newPage = Math.round(
        carouselRef.current.scrollLeft / (cardWidth * cardsPerPage)
      );
      if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    }
  };

  return (
    <section className="team">
      <h2 className={`team-title ${arkhipRegular.className}`}>{title}</h2>

      <div className="carousel-container">
        <div
          className="carousel"
          ref={carouselRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="carousel-item">
              <TeamCard name={member.name} image={member.image} />
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${
              currentPage === index ? "active" : ""
            }`}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .team {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-height: 500px;
          width: 100%;
          background-color: ${themeVariables.cloudyMist};
          padding: 2rem 0;
        }

        .team-title {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-size: 1rem;
          color: ${themeVariables.grassGreen};
        }

        .carousel-container {
          margin-top: 2rem;
          position: relative;
          width: 100%;
          max-width: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .carousel {
          display: flex;
          justify-content: flex-start;

          width: 100%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
          cursor: grab;
          padding: 0.5rem;
        }

        .carousel::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .carousel-item {
          flex: 0 0 auto;
          scroll-snap-align: start;
          display: flex;
          justify-content: center;
        }

        .pagination {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.2rem;
        }

        .pagination-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${themeVariables.lightForeground};
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .pagination-dot.active {
          background-color: ${themeVariables.corporateBlue};
        }

        @media (max-width: 640px) {
          .carousel {
            gap: 1rem;
          }

          .team-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
