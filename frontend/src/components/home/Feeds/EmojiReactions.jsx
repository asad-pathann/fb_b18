import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addReactionData } from "../../../features/posts/postSlice";
import { FiThumbsUp } from "react-icons/fi";
import ReactionText from "../facebook_main_posts_page/EmojiFolder/ReactionText";
import { emojis } from "./../facebook_main_posts_page/EmojiFolder/Emoji";

<emojis />;

export default function EmojiReactions({ post_id, likes }) {
  const [showBar, setShowBar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [hoveredEmoji, setHoveredEmoji] = useState(null);

  const handleReaction = (reaction) => {
    const reactionData = {
      post_id,
      user_id: user?._id,
      emoji: reaction.name,
    };
    dispatch(addReactionData(reactionData));
    setSelected(reaction);
  };

  const isPresent = likes?.find((item) => {
    return item?.id == user?._id;
  });

  const selectedEmoji = emojis.find((e) => e.name === selected?.name);
  return (
    <div className="relative w-full inline-block text-center">
      <div
        className={`flex gap-2 justify-center items-center w-full cursor-pointer p-1 rounded-full `}
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => !selected && setShowBar(false)}
      >
        {selectedEmoji ? (
          <span
            className="noto-emoji-animated text-[15px] font-[500]"
            style={{
              fontFamily: "'Noto Color Emoji Compat', sans-serif",
              display: "flex ",
            }}
            data-code={selectedEmoji.code}
          >
            {selectedEmoji.icon}{" "}
            <div className="text-gray-500 text-md">
              <span className={`${selectedEmoji.color} capitalize`}>
                {selectedEmoji.name}
              </span>
            </div>
          </span>
        ) : (
          <>
            <ReactionText type={isPresent?.type} />
          </>
        )}
      </div>

      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onMouseEnter={() => setShowBar(true)}
            onMouseLeave={() => !selected && setShowBar(false)}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded-full shadow-lg flex gap-1 items-center justify-center"
          >
            {emojis.map((emoji) => (
              <motion.div
                key={emoji.name}
                initial={{ scale: 1, y: 0 }}
                animate={{
                  scale: hoveredEmoji === emoji.name ? 1.5 : 1,
                  y: hoveredEmoji === emoji.name ? -15 : 0,
                }}
                transition={{ type: "spring", stiffness: 500 }}
                whileHover={{ scale: 1.5, y: -15 }}
                whileTap={{ scale: 1.2 }}
                onHoverStart={() => setHoveredEmoji(emoji.name)}
                onHoverEnd={() => setHoveredEmoji(null)}
                onClick={() => {
                  setSelected(emoji);
                  setShowBar(false);
                  handleReaction(emoji);
                }}
                className={`cursor-pointer text-2xl p-1 rounded-full transition-all duration-200 ${
                  hoveredEmoji === emoji.name ? "bg-gray-200" : ""
                }`}
              >
                <span
                  className="noto-emoji-animated"
                  style={{
                    fontFamily: "'Noto Color Emoji Compat', sans-serif",
                    display: "inline-block",
                    animation:
                      hoveredEmoji === emoji.name
                        ? "emoji-animation 1s infinite"
                        : "none",
                  }}
                  data-code={emoji.code}
                >
                  {emoji.icon}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
