'use client';

import { useState } from 'react';
import { Message, continueConversation } from './actions';
import { readStreamableValue } from 'ai/rsc';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <div>
        <Input
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
        <Button
          onClick={async () => {
            const { messages, newMessage } = await continueConversation([
              ...conversation,
              { role: 'user', content: input },
            ]);

            let textContent = '';

            for await (const delta of readStreamableValue(newMessage)) {
              textContent = `${textContent}${delta}`;

              setConversation([
                ...messages,
                { role: 'assistant', content: textContent },
              ]);
            }
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
  
}
