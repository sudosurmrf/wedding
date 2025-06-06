import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import './OurMemories.css';

export default function OurMemories() {
  const [messages, setMessages] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {BASE_URL} = useAuth();

  useEffect(() => {
    async function fetchAll() {
      try {
        // 1) Fetch text messages
        const resMessages = await fetch(`${BASE_URL}/messages`);
        const dataMessages = await resMessages.json();

        // 2) Fetch media items
        const resMedia = await fetch(`${BASE_URL}/messages/media`);
        const dataMedia = await resMedia.json();

        setMessages(dataMessages);
        setMediaItems(dataMedia);
      } catch (err) {
        console.error('Error fetching memories:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <p>Loading memories…</p>;

  return (
    <div className="our-memories-container">
      <h2>💌 Guest Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet. Text our number!</p>
      ) : (
        <ul className="messages-list">
          {messages.map((m) => (
            <li key={m.id} className="message-item">
              <span className="message-date">
                {new Date(m.receivedAt).toLocaleString()}
              </span>
              <p className="message-body"><strong>{m.fromNumber}:</strong> {m.body}</p>
            </li>
          ))}
        </ul>
      )}

      <h2>📸 Guest Photos & Videos</h2>
      {mediaItems.length === 0 ? (
        <p>No media yet, coming soon!</p>
      ) : (
        <div className="media-grid">
          {
          mediaItems.map((item) => (
            <div key={item.id} className="media-card">
              {item.mediaType.startsWith('image/') ? (
                <img
                  src={item.mediaUrl}
                  alt={`From ${item.fromNumber}`}
                  loading="lazy"
                />
              ) : (
                <video controls width="250">
                  <source src={item.mediaUrl} type={item.mediaType} />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="media-meta">
                <small>
                  {new Date(item.receivedAt).toLocaleString()} — {item.fromNumber}
                </small>
                {item.caption && (
                <p className="media-caption">{item.caption}</p>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
