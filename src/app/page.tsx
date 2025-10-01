"use client";
import React from "react";
import { useMotionValue, useSpring, MotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  FlaskConical, // Значок для тех. деталей
  Lightbulb, // Значок для краткого описания
} from "lucide-react";
import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaDatabase as FaDatabaseIcon,
} from "react-icons/fa";
import { SiSharp, SiNextdotjs, SiRasa } from "react-icons/si";

// --- КОМПОНЕНТЫ ---

// Интерфейс для позиций
interface MousePos {
  x: number;
  y: number;
}

// Константы для эффекта отталкивания
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 100;

// --- КОМПОНЕНТ ОТДЕЛЬНОГО ШАРА (БЕЗ ИЗМЕНЕНИЙ) ---

interface BallProps {
  initialX: number;
  initialY: number;
  size: number;
  mousePos: MousePos;
}

const FloatingBall = React.memo(
  ({ initialX, initialY, size, mousePos }: BallProps) => {
    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);
    const springX = useSpring(x, { stiffness: 50, damping: 15 });
    const springY = useSpring(y, { stiffness: 50, damping: 15 });

    useEffect(() => {
      const ballCenterX = x.get();
      const ballCenterY = y.get();
      const dx = ballCenterX - mousePos.x;
      const dy = ballCenterY - mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < REPEL_RADIUS) {
        const unitX = dx / distance;
        const unitY = dy / distance;
        const repelForce = REPEL_STRENGTH * (1 - distance / REPEL_RADIUS);

        const newX = ballCenterX + unitX * repelForce;
        const newY = ballCenterY + unitY * repelForce;

        x.set(newX);
        y.set(newY);
      } else {
        x.set(initialX);
        y.set(initialY);
      }
    }, [mousePos.x, mousePos.y, initialX, initialY, x, y]);

    return (
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-40 blur-sm"
        style={{
          width: size,
          height: size,
          translateX: springX,
          translateY: springY,
        }}
        whileHover={{
          scale: 1.5,
          opacity: 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      />
    );
  }
);
FloatingBall.displayName = 'FloatingBall';

// --- КОМПОНЕНТ КОНТЕЙНЕР (БЕЗ ИЗМЕНЕНИЙ) ---

const FloatingBalls = ({ mousePos }: { mousePos: MousePos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ballsData, setBallsData] = React.useState<BallProps[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || ballsData.length > 0) return;

    const numBalls = 100;
    const data: BallProps[] = Array.from({ length: numBalls }, (_, i) => {
      const safeX = Math.random() * (window.innerWidth * 0.9) + (window.innerWidth * 0.05);
      const safeY = Math.random() * (window.innerHeight * 0.9) + (window.innerHeight * 0.05);

      return {
        initialX: safeX,
        initialY: safeY,
        size: Math.random() * 20 + 10,
        mousePos: mousePos,
      };
    });
    setBallsData(data);
  }, [mousePos, ballsData.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {ballsData.map((ball, i) => (
        <FloatingBall
          key={i}
          initialX={ball.initialX}
          initialY={ball.initialY}
          size={ball.size}
          mousePos={mousePos}
        />
      ))}
    </div>
  );
};

// --- СТРУКТУРА ДАННЫХ ДЛЯ ПРОЕКТОВ ---
interface ProjectData {
  icon: React.ReactNode;
  title: string;
  brief: string; // Краткое, понятное описание
  result: string;
  techDetails: string; // Технические детали
  tags: string[];

}

// --- НОВЫЙ КОМПОНЕНТ КАРТОЧКИ ПРОЕКТА С ДИНАМИКОЙ (БЕЗ ИЗМЕНЕНИЙ В ЛОГИКЕ ДИЗАЙНА) ---

interface ProjectCardProps extends ProjectData {
  mousePos: MousePos;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const CreativeProjectCard = ({ icon, title, brief, result, techDetails, tags, mousePos, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!cardRef.current || !isHovered) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = mousePos.x - centerX;
    const offsetY = mousePos.y - centerY;

    const sensitivity = 0.02;
    x.set(offsetX * -sensitivity);
    y.set(offsetY * -sensitivity);

  }, [mousePos, isHovered, x, y]);

  const rotateX = useTransform(y, [-5, 5], [5, -5]);
  const rotateY = useTransform(x, [-5, 5], [-5, 5]);

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-3xl p-6 md:p-8 flex flex-col group transition-all duration-500 h-full shadow-xl hover:shadow-blue-500/40 transform-gpu"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => { setIsHovered(false); x.set(0); y.set(0); }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
    >
      {/* Декоративный градиентный ободок при наведении */}
      <div className={`absolute inset-0 rounded-3xl p-px transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 filter blur-xl opacity-70" />
      </div>
      
      

      <div className="flex-grow relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-blue-400/50 transition-all duration-300 shadow-lg transform translateZ(30px)">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors transform translateZ(20px)">
          {title}
        </h3>

        <div className="space-y-6">
          {/* Блок: Что это? (Для всех) */}
          <motion.div 
            className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 transform"
            style={{ transform: 'translateZ(10px)' }}
          >
            <p className="text-xs text-blue-400 font-semibold mb-2 uppercase tracking-wide flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Что это? (Для всех)
            </p>
            <p className="text-gray-300 text-sm leading-relaxed font-medium">{brief}</p>
          </motion.div>

          {/* Блок: Результат */}
          <motion.div 
            className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-700/30 rounded-xl p-4 transform"
            style={{ transform: 'translateZ(5px)' }}
          >
            <p className="text-xs text-green-400 font-semibold mb-2 uppercase tracking-wide flex items-center gap-2">
              <Target className="w-3 h-3" />
              Результат
            </p>
            <p className="text-white text-sm font-medium leading-relaxed">{result}</p>
          </motion.div>

          {/* Блок: Технические детали (Для разработчиков) */}
          <motion.div 
            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/30 rounded-xl p-4 transform"
            style={{ transform: 'translateZ(15px)' }}
          >
            <p className="text-xs text-purple-300 font-semibold mb-2 uppercase tracking-wide flex items-center gap-2">
              <FlaskConical className="w-4 h-4" /> Технические детали
            </p>
            <p className="text-gray-200 text-sm leading-relaxed">{techDetails}</p>
          </motion.div>

        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-700/50 relative z-10 transform translateZ(10px)">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-700/70 text-gray-200 px-3 py-1.5 rounded-full border border-gray-600/50 hover:bg-blue-500/30 hover:border-blue-500/50 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};


// КОМПОНЕНТЫ ДЛЯ СИЛЬНЫХ СТОРОН И ПРОЧЕЕ ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ

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
  const heroRef = useRef<HTMLElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ************* ОБНОВЛЕННЫЕ ДАННЫЕ ДЛЯ ПРОЕКТОВ (МАКСИМАЛЬНО КРАТКО) *************
 const projects: ProjectData[] = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    title: "AI-Озвучивание текстов",
    brief:
      "Это программа, которая превращает текст книги в аудиокнигу с живыми голосами.",
    techDetails:
      "Модель на основе Deep Learning (Python/PyTorch) с акцентом на интонационную выразительность и масштабируемость.",
    result:
      "Позволяет издательствам выпускать аудиокниги значительно быстрее и экономичнее, сохраняя профессиональное качество.",
    tags: ["Python", "AI", "PyTorch", "TTS"],
  },
  {
    icon: <Bot className="w-6 h-6 text-green-400" />,
    title: "Интеллектуальный чат-бот поддержки",
    brief:
      "Это виртуальный помощник для клиентов, который может отвечать на сложные вопросы и помогать с заказами.",
    techDetails:
      "Чат-бот на платформе Rasa (Python) + интеграция с SQL/PostgreSQL для хранения и обработки данных.",
    result:
      "Компании получают возможность обрабатывать в несколько раз больше обращений круглосуточно без увеличения штата операторов.",
    tags: ["Rasa", "Python", "SQL", "NLP"],
  },
  {
    icon: <Briefcase className="w-6 h-6 text-purple-400" />,
    title: "Единое окно для управления продажами",
    brief:
      "Это приложение для сотрудников, где собраны все данные из разных систем в одном месте.",
    techDetails:
      "Desktop-приложения на C# (WinForms) + интеграция с REST API для обмена данными.",
    result:
      "Снижает вероятность ошибок ручного ввода и повышает эффективность работы отдела продаж за счет сокращения времени обработки данных.",
    tags: ["C#", ".NET", "REST API"],
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

      <section ref={heroRef} className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-80 z-0"></div>

        {/* Шар за мышкой */}
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-50 pointer-events-none"
          style={{
            left: mousePos.x - 160,
            top: mousePos.y - 160,
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

      {/* ПРОЕКТЫ - ОБНОВЛЕННАЯ СЕКЦИЯ */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Фоновые шарики */}
        <FloatingBalls mousePos={mousePos} />

        <div ref={projectsContainerRef} className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">
            Ключевые проекты
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <CreativeProjectCard 
                key={project.title} 
                {...project} 
                mousePos={mousePos}
                containerRef={projectsContainerRef}
              />
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