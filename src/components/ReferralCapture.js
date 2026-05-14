"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ReferralCapture() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
            // Sadece daha önce ref kaydedilmediyse kaydet
            if (!localStorage.getItem('referralCode')) {
                localStorage.setItem('referralCode', ref);
            }
        }
    }, [searchParams]);

    return null;
}
