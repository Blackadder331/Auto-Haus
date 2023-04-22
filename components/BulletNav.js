import { useRef, useEffect, useCallback } from "react";

function BulletNavigation(props) {
  const indicatorsRef = useRef([]);
  const sectionsRef = props.sectionRefs;

  const resetCurrentActiveIndicator = () => {
    const activeIndicator = document.querySelector(".active");
    activeIndicator.classList.remove("active");
  };

  const onSectionLeavesViewport = (sectionRef) => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              resetCurrentActiveIndicator();
              const element = entry.target;
              const indicator = document.querySelector(
                `a[href='#${element.id}']`
              );
              indicator.classList.add("active");
              return;
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.75,
        }
      );
      observer.observe(sectionRef.current);
    }
  };

  useEffect(() => {
    const indicators = indicatorsRef.current;
    const sections = sectionsRef;

    indicators.forEach((indicator) => {
      indicator.addEventListener("click", function (event) {
        event.preventDefault();
        document
          .querySelector(this.getAttribute("href"))
          .scrollIntoView({ behavior: "smooth" });
        resetCurrentActiveIndicator();
        this.classList.add("active");
      });
    });

    sections.forEach(onSectionLeavesViewport);

    return () => {
      indicators.forEach((indicator) => {
        indicator.removeEventListener("click", function (event) {
          event.preventDefault();
          document
            .querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
          resetCurrentActiveIndicator();
          this.classList.add("active");
        });
      });
    };
  }, [sectionsRef]);

  return (
    <aside>
      <ul>
        <li>
          <a
            className="indicator active"
            href="#first"
            ref={(el) => (indicatorsRef.current[0] = el)}
          ></a>
        </li>
        <li>
          <a
            className="indicator"
            href="#second"
            ref={(el) => (indicatorsRef.current[1] = el)}
          ></a>
        </li>
        <li>
          <a
            className="indicator"
            href="#third"
            ref={(el) => (indicatorsRef.current[2] = el)}
          ></a>
        </li>
        <li>
          <a
            className="indicator"
            href="#fourth"
            ref={(el) => (indicatorsRef.current[3] = el)}
          ></a>
        </li>
        <li>
          <a
            className="indicator"
            href="#fifth"
            ref={(el) => (indicatorsRef.current[4] = el)}
          ></a>
        </li>
      </ul>
    </aside>
  );
}

export default BulletNavigation;
