import { Container } from "@/components/shared/container";

export function Footer() {
    return (
        <footer className="mt-auto border-t border-green-100 bg-white">
            <Container>
                <div className="flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
                    <p className="text-sm font-semibold text-green-800">
                        বাজার দর
                        <span className="font-normal text-gray-600">
                            {" "}
                            - প্রয়োজনীয় পণ্যের দাম এক নজরে।
                        </span>
                    </p>

                    <p className="max-w-xl text-xs leading-relaxed text-gray-500 sm:text-right">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত
                        হয়।
                    </p>
                </div>
            </Container>
        </footer>
    );
}
