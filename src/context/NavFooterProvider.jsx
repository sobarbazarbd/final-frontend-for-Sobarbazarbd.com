"use client";
import React, { createContext, useEffect, useState } from "react";

export const NavFooterContext = createContext(null);

export default function NavFooterProvider({ initialData = null, children }) {
	const [ownerInfo, setOwnerInfo] = useState(initialData?.owner_info ?? null);
	const [categories, setCategories] = useState(initialData?.categories ?? []);

	useEffect(() => {
		setOwnerInfo(initialData?.owner_info ?? null);
		setCategories(initialData?.categories ?? []);
	}, [initialData]);

	const value = {
		ownerInfo,
		categories,
	};

	return <NavFooterContext.Provider value={value}>{children}</NavFooterContext.Provider>;
}
