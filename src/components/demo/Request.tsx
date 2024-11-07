"use client";
import React, { useState } from "react";
import JSZip from "jszip";

import FileTree from "./FileTree";
interface FileItem {
  name: string;
  isDirectory: boolean;
  file: JSZip.JSZipObject;
}
interface TreeNode {
  id: string;
  name: string;
  isSelectable: boolean;
  children: TreeNode[];
}
interface Directory {
  id: string;
  isSelectable: boolean;
  name: string;
  children?: Directory[];
}

const Request: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const [elements, setElements] = useState<Directory[] | undefined>();
  const [contentLoading, setContentLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  let idCounter = 1;

  const [fileMap, setFileMap] = useState<Map<string, FileItem>>(new Map());

  const findFileByName = (name: string): FileItem | undefined => {
    return files.find((file) => file.name.endsWith(name));
  };

  const loadFileContent = async (nodeId: string) => {
    setContentLoading(true);
    try {
      const findNode = (nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
          if (node.id === nodeId) return node;
          if (node.children) {
            const found = findNode(node.children);
            if (found) return found;
          }
        }
        return null;
      };

      const node = elements ? findNode(elements as TreeNode[]) : null;
      if (!node) return;

      const file = findFileByName(node.name);
      if (!file) return;

      const content = await file.file.async("string");
      setSelectedContent(content);
    } catch (error) {
      console.error("Error loading file content:", error);
      setSelectedContent("Error loading file content");
    } finally {
      setContentLoading(false);
    }
  };

  React.useEffect(() => {
    if (selectedId) {
      loadFileContent(selectedId);
    }
  }, [selectedId]);
  function buildElements(inputArray: FileItem[]): Directory[] {
    const root: Record<string, any> = {};

    inputArray.forEach((item) => {
      const pathParts = item.name.split("/").filter((part) => part);
      let currentDir = root;

      pathParts.forEach((part, index) => {
        if (isFile(part)) {
          if (!currentDir[part]) {
            currentDir[part] = {
              id: String(idCounter++),
              isSelectable: true,
              name: part,
              children: undefined,
            };
          }
        } else {
          if (!currentDir[part]) {
            currentDir[part] = {
              id: String(idCounter++),
              isSelectable: true,
              name: part,
              children: {},
            };
          }
          currentDir = currentDir[part].children;
        }
      });
    });

    return Object.values(root).map((dir) => {
      return {
        id: dir.id,
        isSelectable: true,
        name: dir.name,
        children: buildChildren(dir.children),
      };
    });
  }

  function buildChildren(
    children: Record<string, any> | undefined
  ): Directory[] {
    if (!children) return [];
    return Object.values(children).map((child) => {
      const childObj: Directory = {
        id: child.id,
        isSelectable: true,
        name: child.name,
        children: buildChildren(child.children),
      };
      return childObj;
    });
  }

  function isFile(part: string): boolean {
    return /\.[a-z0-9]+$/i.test(part);
  }

  const downloadAndExtractRepo = async () => {
    setLoading(true);
    try {
      const repoUrl = "https://github.com/thisisamank/Plasmic";
      const response = await fetch(
        `http://localhost:3001/download-repo?repoUrl=${encodeURIComponent(
          repoUrl
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the repository");
      }

      const zipBlob = await response.blob();
      if (!zipBlob) {
        throw new Error("Received empty zip file");
      }

      const zip = await JSZip.loadAsync(zipBlob);
      const fileList: FileItem[] = [];

      zip.forEach((relativePath, file) => {
        fileList.push({ name: relativePath, isDirectory: file.dir, file });
      });
      setFiles(fileList);
      if (!fileList.length) {
        throw new Error("No files found in the zip archive");
      }
      console.log("Extracted file list:", fileList);
      const ELEMENTS = buildElements(fileList);
      console.log(ELEMENTS);
      setElements(ELEMENTS);
    } catch (error) {
      console.error("Error extracting zip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex text-white min-h-screen overflow-hidden">
      <div className="w-1/3 p-4  bg-[#010409]">
        <h1>GitHub Repo File Explorer</h1>
        <button onClick={downloadAndExtractRepo} disabled={loading}>
          {loading ? "Downloading..." : "Download and Extract Repo"}
        </button>

        {elements && (
          <FileTree
            data={elements as TreeNode[]}
            SelectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        )}
      </div>
      <div className="w-2/3 p-4 bg-[#0D1117] min-h-screen fixed ml-[33vw]">
        {selectedId && (
          <div>
            <h2 className="text-lg font-bold mb-4">File Content:</h2>
            {contentLoading ? (
              <div className="flex items-center justify-center p-4">
                <span className="animate-spin mr-2">⌛</span>
                Loading...
              </div>
            ) : (
              <pre className="bg-transparent p-4 rounded overflow-auto max-h-screen">
                {selectedContent}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
