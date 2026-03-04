"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const education = [
  {
    id: 1,
    degree: "M.Tech",
    field: "Cloud Computing",
    institution: "BITS Pilani",
    type: "Postgraduate · In Progress",
    year: "2024 – Present",
    color: "#38bdf8",
    description:
      "Focus on distributed systems, cloud infrastructure, and scalable platform architectures.",
    tags: ["Distributed Systems", "Cloud Native", "Platform Arch"],
  },
  {
    id: 2,
    degree: "B.Tech",
    field: "Electrical & Electronics Engineering",
    institution: "VIT University, Vellore",
    type: "Undergraduate",
    year: "2015 – 2019",
    color: "#a78bfa",
    description:
      "Foundation in systems engineering and structured problem solving for infrastructure thinking.",
    tags: ["Systems Engineering", "Computing", "Problem Solving"],
  },
  {
    id: 3,
    degree: "Certifications",
    field: "Continuous Learning",
    institution: "AWS · CNCF · HashiCorp",
    type: "Professional Development",
    year: "Ongoing",
    color: "#34d399",
    description:
      "Industry certifications across cloud, DevOps, and platform engineering domains.",
    tags: ["Kubernetes", "AWS", "Terraform", "Cloud Architecture"],
  },
];

export default function Education() {
  const [active, setActive] = useState(null);

  return (
    <section className="edu">
      <div className="container">

        <div className="heading">
          <span>02 — Education</span>
          <h2>
            Built on <em>strong</em> foundations
          </h2>
        </div>

        <div className="timeline">
          {education.map((item) => {
            const isActive = active === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="entry"
                onClick={() => setActive(isActive ? null : item.id)}
              >
                <div
                  className="dot"
                  style={{
                    borderColor: item.color,
                    boxShadow: isActive
                      ? `0 0 20px ${item.color}`
                      : "none",
                  }}
                />

                <motion.div
                  layout
                  className="card"
                  style={{
                    borderColor: isActive
                      ? item.color
                      : "rgba(255,255,255,.08)",
                  }}
                >
                  <div className="top">
                    <span
                      className="degree"
                      style={{
                        color: item.color,
                        borderColor: item.color,
                      }}
                    >
                      {item.degree}
                    </span>

                    <span className="year">{item.year}</span>
                  </div>

                  <h3>{item.field}</h3>
                  <p className="inst">{item.institution}</p>
                  <p className="type">{item.type}</p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="expand"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{item.description}</p>

                        <div className="tags">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{ borderColor: item.color }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`

      .edu{
        padding:100px 0;
        font-family:sans-serif;
      }

      .container{
        max-width:900px;
        margin:auto;
      }

      .heading span{
        font-size:12px;
        letter-spacing:.2em;
        color:#38bdf8;
      }

      h2{
        font-size:40px;
        margin-top:10px;
      }

      em{
        color:#38bdf8;
        font-style:normal;
      }

      .timeline{
        margin-top:60px;
        border-left:1px solid rgba(255,255,255,.08);
      }

      .entry{
        position:relative;
        padding-left:50px;
        margin-bottom:40px;
        cursor:pointer;
      }

      .dot{
        position:absolute;
        left:-7px;
        top:12px;
        width:14px;
        height:14px;
        border-radius:50%;
        border:2px solid;
        background:#0f172a;
      }

      .card{
        padding:24px;
        border-radius:14px;
        border:1px solid rgba(255,255,255,.08);
        background:rgba(20,20,30,.6);
        backdrop-filter:blur(10px);
        transition:.3s;
      }

      .card:hover{
        transform:translateX(4px);
      }

      .top{
        display:flex;
        justify-content:space-between;
        margin-bottom:6px;
      }

      .degree{
        font-size:11px;
        border:1px solid;
        padding:4px 8px;
        border-radius:6px;
      }

      .year{
        font-size:12px;
        color:#94a3b8;
      }

      h3{
        margin:8px 0 4px;
      }

      .inst{
        font-size:14px;
        color:#94a3b8;
      }

      .type{
        font-size:12px;
        color:#64748b;
      }

      .expand{
        margin-top:15px;
      }

      .tags{
        margin-top:12px;
        display:flex;
        gap:8px;
        flex-wrap:wrap;
      }

      .tags span{
        font-size:11px;
        padding:4px 8px;
        border:1px solid;
        border-radius:6px;
      }

      `}</style>
    </section>
  );
}
