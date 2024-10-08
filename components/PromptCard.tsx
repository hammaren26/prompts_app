"use client";

import { formatDateString } from "@utils/dateUtils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function sliceText(text: string, length: number) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }

  return text;
}

const PromptCard = ({ post, handleTagClick }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex flex-col justify-start  gap-3 cursor-pointer">
          <p className="text-sm text-gray-600 mt-2 font-satoshi">
            {formatDateString(post.date)}
          </p>
          <p className="font-satoshi text-sm text-gray-700">
            {sliceText(post.prompt, 70)}
          </p>
          <div>
            <p
              className="font-inter text-sm blue_gradient cursor-pointer"
              onClick={() => {
                handleTagClick && handleTagClick(post.tag);
              }}
            >
              {post.tag}
            </p>
          </div>
          <Link
            href={`/prompts/${post._id}`}
            className="bg-blue-500 w-fit hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Открыть заметку
          </Link>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
