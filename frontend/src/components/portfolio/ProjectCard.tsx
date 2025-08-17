"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Buttonコンポーネントを追加
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// プロジェクト定義
export interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_link: string;
  demo_link: string;
  duration?: string;
  challenges?: string;
  myRole?: string;
}

// プロジェクトカード
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="overflow-hidden">
            <Image
              src={project.image_url}
              alt={`${project.name} thumbnail`}
              width={600}
              height={400}
              className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-2">{project.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.split(",").map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-end gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.github_link, "_blank", "noopener,noreferrer");
            }}
          >
            <Github size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.demo_link, "_blank", "noopener,noreferrer");
            }}
          >
            <ExternalLink size={20} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
