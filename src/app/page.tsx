"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Send,
  Cpu,
  Database,
  Bot,
  BookOpen,
  Briefcase,
  BarChart3,
  Lock,
  ArrowUpRight,
  BrainCircuit,
  Code,
  Target,
} from "lucide-react";
import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaDatabase as FaDatabaseIcon,
} from "react-icons/fa";
import { SiSharp, SiNextdotjs, SiRasa } from "react-icons/si";

// --- КОМПОНЕНТЫ ---

interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  result: string;
  tags: string[];
}

// Компонент для карточки проекта
const ProjectCard = ({ icon, title, description, result, tags }: ProjectCardProps) => (
  <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex flex-col group hover:border-blue-400 transition-all duration-300 h-full">
    <div className="flex-grow">
      <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="mt-auto mb-4">
        <p className="text-xs text-blue-400 font-semibold mb-1">
          Ключевой результат:
        </p>
        <p className="text-sm text-gray-300">{result}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700/50">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

interface StrengthCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Компонент для карточки сильных сторон
const StrengthCard = ({ icon, title, description }: StrengthCardProps) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
    <div className="w-12 h-12 text-blue-400 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// --- ОСНОВНАЯ СТРАНИЦА ---
export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Данные для проектов
  const projects = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      title: "TTS для аудиокниг",
      description:
        "Нейросеть, превращающая текст в речь с разделением голосов для разных персонажей.",
      result:
        "Создан инструмент для быстрой и качественной озвучки контента с помощью AI.",
      tags: ["Python", "AI", "PyTorch"],
    },
    {
      icon: <Bot className="w-6 h-6 text-green-400" />,
      title: "Чат-боты",
      description:
        "Интеллектуальные боты на Rasa с интеграцией баз данных для автоматизации запросов.",
      result: "Снижена нагрузка на поддержку, автоматизирован поиск товаров и цен.",
      tags: ["Rasa", "Python", "SQL"],
    },
    {
      icon: <Briefcase className="w-6 h-6 text-purple-400" />,
      title: "Инструменты для отдела продаж",
      description:
        "Desktop-приложения на C# (WinForms) + интеграция с REST API для обмена данными.",
      result:
        "Автоматизированы рутинные задачи и ускорен обмен данными между системами.",
      tags: ["C#", "SQL Server", ".NET", "REST API"],
    },
    {
      icon: <Database className="w-6 h-6 text-yellow-400" />,
      title: "Проектирование SQL систем",
      description:
        "Разработка архитектуры баз данных, написание запросов, процедур и аналитических отчетов.",
      result: "Построены надежные и масштабируемые системы хранения данных.",
      tags: ["SQL", "PostgreSQL", "Analytics"],
    },
  ];

  // Данные для навыков
  const skills = {
    backend: [
      { name: "Python", icon: <FaPython /> },
      { name: "C#", icon: <SiSharp /> },
    ],
    frontend: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
    ],
    data: [
      { name: "SQL", icon: <FaDatabaseIcon /> },
      { name: "Rasa", icon: <SiRasa /> },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-80 z-0"></div>

        {/* Шар за мышкой */}
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-50 "
          animate={{
            x: mousePos.x - 160,
            y: mousePos.y - 160,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 150,
            mass: 0.5,
          }}
        />

        {/* Контент */}
        <div className="z-10 flex flex-col items-center">
          <img
            src="/avatar.png"
            alt="Аватар Никиты Кирсанова"
            className="w-32 h-32 rounded-full shadow-2xl mb-6 border-4 border-gray-800/50"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Кирсанов Никита
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl">
            Занимаюсь разработкой решений разного уровня — от чат-ботов до
            инструментов для работы с данными.
          </p>
          <div className="mt-8">
            <a
              href="#contact"
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center gap-2 justify-center"
            >
              Мои контакты
            </a>
          </div>
        </div>
      </section>

      {/* ОБО МНЕ */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-white">Привет, я Никита.</h2>
        <p className="text-lg text-gray-400 leading-relaxed">
          Я инженер, который переводит идеи в готовые продукты. Мой опыт
          охватывает разработку чат-ботов, систем и AI-решений. Главная цель моей
          работы — чтобы продукт был надёжным, удобным и готовым к реальному
          использованию.
        </p>
      </section>

      {/* СИЛЬНЫЕ СТОРОНЫ */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">
            Почему я?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <StrengthCard
              icon={<Code size={40} />}
              title="От бэкенда до фронтенда"
              description="Мне нравится решать задачи комплексно: проектирую серверную часть на C# или Python, а затем создаю понятный интерфейс."
            />
            <StrengthCard
              icon={<BrainCircuit size={40} />}
              title="Работа с данными и AI"
              description="Помогаю автоматизировать рутину с помощью чат-ботов и умею работать с нейросетями. Мне интересно находить практическую пользу в данных."
            />
          </div>
        </div>
      </section>

      {/* ПРОЕКТЫ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">
            Ключевые проекты
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* СТЕК */}
      <section className="py-20 bg-black/20">
        <h2 className="text-3xl font-semibold text-center mb-12 text-white">
          Технологический стек
        </h2>
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-blue-400 mb-4 capitalize">
                {category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {skillList.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 p-3 bg-gray-800/50 rounded-lg"
                    title={skill.name}
                  >
                    <div className="text-3xl text-gray-300">{skill.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section
        id="contact"
        className="bg-gradient-to-t from-black to-gray-900 text-white py-20 text-center px-4"
      >
        <h2 className="text-3xl font-semibold mb-4">
          Готов принести пользу вашей команде
        </h2>
        <p className="mb-8 text-gray-400 max-w-xl mx-auto">
          Открыт к предложениям о работе и участию в интересных проектах.
          Свяжитесь со мной, и мы обсудим, как я могу помочь.
        </p>
        <div className="flex justify-center flex-wrap gap-6">
          <a
            href="mailto:ydafred.dafred@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            <Mail size={20} /> Email
          </a>
          <a
            href="https://t.me/NiOReD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-sky-500 rounded-xl hover:bg-sky-600 transition-transform transform hover:scale-105"
          >
            <Send size={20} /> Telegram
          </a>
        </div>
      </section>

      <footer className="bg-black text-center py-6">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Никита Кирсанов
        </p>
      </footer>
    </main>
  );
}
