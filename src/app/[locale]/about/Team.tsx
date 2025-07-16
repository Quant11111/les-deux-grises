import { arkhipRegular } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";

// Chargement dynamique du composant TeamCard
const TeamCard = dynamic(() => import("./TeamCard"), {
  ssr: true,
  loading: () => <div className="team-card-skeleton" />,
});

export default function Team({ title }: { title: string }) {
  // Liste mémorisée des membres de l'équipe
  const teamMembers = useMemo(
    () => [
      {
        id: 1,
        name: "KARIM ET LEA\nIBRAHIM",
        image:
          "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team5.png",
      },
      {
        id: 6,
        name: "ETIENNE\nSIMON",
        image:
          "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team6.JPG",
      },
      {
        id: 2,
        name: "SPEEDY\nJAYLO",
        image:
          "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team4.png",
      },
      {
        id: 5,
        name: "ANTOINE\nHELIE",
        image:
          "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team1.png",
      },
      {
        id: 4,
        name: "SHAELYN\nDUFOIX",
        image:
          "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team2.png",
      },
      {
        id: 3,
        name: "ALEXIS\nLARCHER",
        image:
          "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team3.png",
      },
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(
    new Set([0, 1, 2])
  );
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculer le nombre total de pages
  const totalPages = useMemo(
    () => Math.ceil((teamMembers.length + 1) / cardsPerPage),
    [teamMembers.length, cardsPerPage]
  );

  // Optimisation: debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (window.innerWidth < 640) {
          setCardsPerPage(1);
        } else if (window.innerWidth < 1024) {
          setCardsPerPage(2);
        } else {
          setCardsPerPage(3);
        }
      }, 100); // 100ms debounce
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Setup Intersection Observer pour le lazy loading
  useEffect(() => {
    const options = {
      root: carouselRef.current,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const updateVisibility = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = Number(entry.target.getAttribute("data-id"));
        if (entry.isIntersecting) {
          setVisibleItems((prev) => new Set(Array.from(prev).concat(id)));
        }
      });
    };

    const observer = new IntersectionObserver(updateVisibility, options);

    // Observer tous les éléments
    document.querySelectorAll(".carousel-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [cardsPerPage]); // Re-setup lorsque cardsPerPage change

  // Fonction optimisée pour naviguer vers une page
  const goToPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex < 0 || pageIndex >= totalPages) return;

      setCurrentPage(pageIndex);
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.scrollWidth / teamMembers.length;
        carouselRef.current.scrollTo({
          left: cardWidth * pageIndex * cardsPerPage,
          behavior: "smooth",
        });
      }
    },
    [cardsPerPage, teamMembers.length, totalPages]
  );

  // Optimisation: Throttled scroll update
  const updateCurrentPageFromScroll = useCallback(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / teamMembers.length;
      const newPage = Math.round(
        carouselRef.current.scrollLeft / (cardWidth * cardsPerPage)
      );
      if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
        setCurrentPage(newPage);
      }
    }
  }, [cardsPerPage, currentPage, teamMembers.length, totalPages]);

  // Gestionnaires d'événements optimisés
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (carouselRef.current) {
        e.preventDefault();
        carouselRef.current.scrollLeft += e.deltaY;
        requestAnimationFrame(updateCurrentPageFromScroll);
      }
    },
    [updateCurrentPageFromScroll]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (carouselRef.current) {
      isDragging.current = true;
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    requestAnimationFrame(updateCurrentPageFromScroll);
  }, [updateCurrentPageFromScroll]);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    requestAnimationFrame(updateCurrentPageFromScroll);
  }, [updateCurrentPageFromScroll]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  // Gestionnaires pour le tactile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (carouselRef.current) {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    requestAnimationFrame(updateCurrentPageFromScroll);
  }, [updateCurrentPageFromScroll]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

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
          {teamMembers.map((member, index) => (
            <div key={member.id} className="carousel-item" data-id={index}>
              <TeamCard
                name={member.name}
                image={member.image}
                priority={index < cardsPerPage} // Précharger uniquement les premières cartes
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages - 1 }).map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${
              currentPage === index ? "active" : ""
            }`}
            onClick={() => goToPage(index)}
            aria-label={`Page ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .team {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          max-height: 500px;
          width: 100%;
          background-color: ${themeVariables.cloudyMist};
          padding: 2rem 0;
          contain: content;
        }

        .team-title {
          position: absolute;
          top: rem;
          left: 3rem;
          font-size: 26px;
          font-weight: 400;
          color: ${themeVariables.grassGreen};
        }

        .carousel-container {
          margin-top: 4rem;
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
          will-change: transform;
        }

        .carousel::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .carousel-item {
          flex: 0 0 auto;
          scroll-snap-align: start;
          display: flex;
          justify-content: center;
          contain: layout style;
        }

        .team-card-skeleton {
          height: 306px;
          width: 200px;
          background-color: #e0e0e0;
          border-top-left-radius: 100px;
          border-top-right-radius: 100px;
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
          background-color: ${themeVariables.cloudyMist};
          border: 2px solid ${themeVariables.corporateBlue};
          padding: 0;
          cursor: pointer;
          transition: background-color 0.2s ease;
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
