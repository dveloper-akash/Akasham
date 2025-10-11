import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string,
    email: string,
    displayName: string,
    avatarUrl: string,
    username: string,
    phone?: string,
    country: string,
    state: string,
    role: "client" | "editor" | "admin",
}
export interface Client {
    bio?: string,
    company?: string,
    job?: string,
    socials?: string[],
}
export interface Editor {
    bio?: string,
    portfolio?: string[],
    skills?: string[],
    socials?: string[],
}
interface AuthState {
    user: User | null
    role: "CLIENT" | "EDITOR" | null
    setRole: (role: "CLIENT" | "EDITOR" | null) => void
    client: Client | null
    editor: Editor | null
    isLoggedIn: boolean
    isLoading: boolean
    needsOnboarding: boolean
    updateUser: (updates: Partial<User>) => void;
    updateClient: (updates: Partial<Client>) => void;
    updateEditor: (updates: Partial<Editor>) => void;
    setUser: (user: User | null) => void
    setEditor: (editor: Editor) => void;
    setClient: (client: Client) => void;
    setNeedsOnboarding: (value: boolean) => void
    setIsLoggedIn: (value: boolean) => void
    logout: () => void
    setLoading: (loading: boolean) => void
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            role: null,
            setRole: (role) => set({ role }),
            editor: null,
            client: null,
            isLoggedIn: false,
            isLoading: true,
            needsOnboarding: false,
            setIsLoggedIn: (value) => set({ isLoggedIn: value }),
            setUser: (user: User | null) => set({ user, isLoggedIn: !!user }),
            updateUser: (updates) =>
                set((state) =>
                    state.user ? { user: { ...state.user, ...updates } } : state
                ),
            updateClient: (updates) =>
                set((state) =>state.client ? { client: { ...state.client, ...updates } } : state),
            updateEditor: (updates) =>set((state) =>
                state.editor ? { editor: { ...state.editor, ...updates } } : state),
            setEditor: (editor) => set({ editor }),
            setClient: (client) => set({ client }),
            setNeedsOnboarding: (value) => set({ needsOnboarding: value }),
            logout: () => set({ user: null, editor: null, client: null, isLoggedIn: false }),
            setLoading: (loading) => set({ isLoading: loading }),
        }),
        {
            name: 'auth-storage', // Key used in localStorage
            partialize: (state) => ({
                user: state.user,
                editor: state.editor,
                client: state.client,
                isLoggedIn: state.isLoggedIn,
                needsOnboarding: state.needsOnboarding,
                role: state.role,
            }),
        }
    )
);

export default useAuthStore;
