-- Users table
CREATE TABLE
  users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT,
    email TEXT,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now (),
    updated_at TIMESTAMP DEFAULT now (),
    UNIQUE (provider, provider_account_id)
  );

-- Conversations table
CREATE TABLE
  conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT,
    created_at TIMESTAMP DEFAULT now ()
  );

-- Conversation participants (relationship table)
CREATE TABLE
  conversation_participants (
    conversation_id UUID REFERENCES conversations (id) ON DELETE CASCADE,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT now (),
    PRIMARY KEY (conversation_id, user_id)
  );

-- Messages table
CREATE TABLE
  messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    conversation_id UUID REFERENCES conversations (id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users (id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT now ()
  );

-- Contacts table
CREATE TABLE
  contacts (
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    contact_id UUID REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now (),
    PRIMARY KEY (user_id, contact_id)
  );