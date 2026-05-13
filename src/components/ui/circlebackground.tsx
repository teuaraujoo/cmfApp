function BackgroundCircle() {
    return (
        <div className="pointer-events-none absolute inset-0 right-0 overflow-hidden md:block hidden">
            {/* Outer big circle */}

            <div className="absolute left-1/1 top-0 h-650 w-650 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
            {/* Inner circle */}
            <div className="absolute left-1/1 top-0 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground dark:bg-background" />
        </div>
    );
};

export { BackgroundCircle };