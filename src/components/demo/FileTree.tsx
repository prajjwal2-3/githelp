import React, { useState } from 'react';
import { getFileIcon } from '@/helper/GetIcon';
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';
import add from '../../../public/icons/default_file.svg'
import Image from 'next/image';
interface TreeNode {
  id: string;
  name: string;
  isSelectable: boolean;
  children: TreeNode[];
}

interface FileTreeProps {
  data: TreeNode[];
  setSelectedId:React.Dispatch<React.SetStateAction<string | null>>;
  SelectedId:string | null
}

interface FileTreeItemProps {
  node: TreeNode;
  level: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}
const FileIcon: React.FC<{ filename: string; isFolder: boolean; isOpen?: boolean }> = ({ filename, isFolder, isOpen = false }) => {
    const iconName = isFolder
      ? (isOpen ? getIconForOpenFolder(filename) : getIconForFolder(filename))
      : getIconForFile(filename);
  
    const defaultIcon = isFolder ? 'default_folder.svg' : 'default_file.svg';
  
    return (
      <Image 
        src={`/icons/${iconName}`} 
        alt={`${filename} icon`} 
        width={16} 
        height={16}
        onError={(e) => {
          // If there's an error loading the icon, fallback to the default icon
          const imgElement = e.target as HTMLImageElement;
          imgElement.onerror = null; // Prevent infinite loop
          imgElement.src = `/icons/${defaultIcon}`;
        }}
      />
    );
  };
const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  node, 
  level, 
  selectedId,
  onSelect 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasChildren) {
      onSelect(node.id);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const isSelected = selectedId === node.id;

  return (
    <div style={{ marginLeft: `${level * 3}px` }}>
      <div 
        className={`flex items-center cursor-pointer py-1 ${
          isSelected 
            ? 'bg-[#0D1117] hover:bg-blue-600' 
            : 'hover:bg-blue-700'
        }`}
        onClick={handleClick}
      >
        <span className="mr-1">
          {hasChildren ? (
            <span className="text-gray-500">
              {isExpanded ? '▼' : '▶'}
            </span>
          ) : (
            <span className="ml-4"></span>
          )}
        </span>
        <span className="mr-2">
          <FileIcon 
            filename={node.name} 
            isFolder={hasChildren} 
            isOpen={isExpanded}
          />
        </span>
        <span>{node.name}</span>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem 
              key={child.id} 
              node={child} 
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree: React.FC<FileTreeProps> = ({ data,setSelectedId,SelectedId }) => {
 

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="font-mono text-sm">
      {data.map((node) => (
        <FileTreeItem 
          key={node.id} 
          node={node} 
          level={0}
          selectedId={SelectedId}
          onSelect={handleSelect}
        />
      ))}
     
    </div>
  );
};

export default FileTree;